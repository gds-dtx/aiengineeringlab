---
name: integration-catalogue
description: "Build an integration catalogue for one selected source system from repository evidence only. Use for publish/subscribe mapping, adapter routing, or stakeholder message inventory requests across legacy estates."
argument-hint: "Required: input_system_name and repo paths. Optional: source systems list, metadata file paths, output_file, timezone_label, publisher call patterns."
---

# Integration Catalogue

## Goal
Create an integration catalogue for a selected source system across stakeholder databases using the integration platform metadata available in the target estate.

Analysis rules:
1. Use repository evidence only: stakeholder code plus integration platform metadata files.
2. Do not invent facts. If a field cannot be proven, set it to Unknown and record it in Open Questions / Gaps.
3. Include a catalogue row only when the selected input system repository or shared/common repository contains the actual publisher flow for that message, meaning a publish call such as gicpk003.p_pub_gen_xml or (in rare cases) gicpk003.p_pub_genv_xml with enough nearby code to identify the publisher package.procedure, event_type, and message_type.
4. If integration metadata contains routing for an event but step 3 does not find the publisher implementation in those repositories, exclude that row from the catalogue and note the mismatch in Open Questions / Gaps when useful.

## Required Inputs (Ask At Skill Runtime)
Collect these before analysis starts:
1. input_system_name: selected source system identifier
2. source_systems: list of valid system identifiers in scope
3. repo_paths:
- selected input system repo path
- shared/common repo path (optional)
- integration platform repo path
- additional source repo paths (optional map)
4. metadata_files:
- publish metadata file path (required)
- subscribe metadata file path (required)
- adapter/system metadata file path (required)
5. output_file: default `output/<input_system_name>-integration-catalogue.md`
6. timezone_label: optional; default executing environment local timezone label
7. publisher_call_patterns: optional; default includes `gicpk003.p_pub_gen_xml` and `gicpk003.p_pub_genv_xml`

## Deliverable
Produce exactly one markdown file:
- `<output_file>`

The file must include:
1. A markdown table with exact columns in this order:
- Source DB
- Destination DB
- Event Group
- Event Type
- Message Type
- Message Style(Old/New)
- Functionality
- Publisher Package
- Queue Name
- Publisher Adapter
- CBR Rule
- Subscriber Adapter
- Subscriber Package
- Notes / Comments
2. Open Questions / Gaps section listing unresolved fields and next steps.
3. A required `Run Metadata` block at the bottom of the markdown output with:
- `run_started_local`, `run_finished_local`
- `run_timezone` (use `timezone_label` when provided; otherwise use the executing environment local timezone label)
- `repos_scanned` (paths)

## Scope Rules
For selected input_system_name, always analyze:
1. selected stakeholder repo for input_system_name
2. shared/common repo (when provided)
3. integration platform repo (metadata + config sources)

Notes:
- Shared/common repository logic may be deployed to multiple stakeholders.
- g_current_stakeholder and g_source_stakeholder equal stakeholder at runtime.
- Integration metadata files are source of truth for publish/subscribe configuration.
- In metadata extracts, EVENT_NAME represents the same business event as publisher-code event_type; treat them as equivalent keys for joins.
- message_type is a separate field from event_type/EVENT_NAME and must be extracted and tracked independently.
- When scanning stakeholder repositories, include Oracle source artifacts across relevant extensions, not only `.sql`. At minimum include `.sql`, `.pkb`, `.pks`, `.trg`, and equivalent Oracle source files.

## Style Classification
Old style:
- XML tags via gicpk000.g_name_value or tag-table approach.
- XML via gicpk003.p_gen_xml, publish via gicpk003.p_pub_gen_xml or (rarely) gicpk003.p_pub_genv_xml.
- Subscribe package is not passed in message.
- event_type is not exec_proc_evt.
- target adapter not passed.
- message_type exists and identifies action.

New style:
- XML params via gicpk003.p_add_par.
- XML via gicpk003.p_gen_par_xml, publish via gicpk003.p_pub_gen_xml or (rarely) gicpk003.p_pub_genv_xml.
- subscribe package is passed in message.
- event_type = exec_proc_evt.
- target adapter is passed.
- message_type exists and identifies action.

## Mandatory Process
1. Capture skill start time and plan start time in local timezone.
2. Load integration metadata files from `metadata_files` input:
- publish metadata
- subscribe metadata
- adapter/system metadata
3. Normalize headers, trim values, and deduplicate subscribe rows on:
- (EVENT_NAME, EVENT_GROUP_NAME, CBR_RULE, SUBSCRIBE_ADAPTERS, SUBSCRIBE_PROCEDURE_NAME)
4. Scan selected stakeholder repo + shared/common repo (when provided) for publishing flows:
- locate publish calls using `publisher_call_patterns`
- identify the upstream XML builder call: p_gen_xml or p_gen_par_xml
- extract event_type, message_type, and publisher package.procedure from the same flow
- extract new-style overrides when present: target_adapter, subscribe_package, optional queue override
- extract a nearby one-line functionality comment when available
- scan all relevant Oracle source file extensions during this step, including package specs, package bodies, and trigger files
- retain only messages whose publisher flow is present in the selected input system repository or the shared/common repository
4a. Perform mandatory multi-pass publisher discovery so no flow style is skipped:
- Pass A (call-centric): find all gicpk003.p_pub_gen_xml and gicpk003.p_pub_genv_xml call sites.
- Pass B (metadata-centric): for selected source adapters from publish-details, enumerate candidate EVENT_NAME values and verify each has one of: code-backed publisher flow, explicit no-code evidence, or explicit out-of-scope rationale.
- Pass C (adapter/event constant-centric): search for event constants/variables (for example *_event_name) and adapter-linked logic where p_pub_genv_xml may publish using constants rather than string literals.
- Union A/B/C and deduplicate before row derivation.
4b. Resolve indirect literals before classifying a flow:
- If event_type or message_type is passed via variable/constant, resolve from nearest assignment or package constant in the same scope when possible.
- If a value cannot be resolved from repository evidence, set that field to Unknown and log in Open Questions / Gaps.
- Never drop a code-backed publisher flow only because event_type/message_type is indirect.
5. For each extracted published message:
- join publish-details by event (publisher event_type = CSV EVENT_NAME) and source-system adapter mapping
- join subscribe-details by event (publisher event_type = CSV EVENT_NAME)
- resolve adapters to system via adapter-details
6. Apply new-style precedence:
- if publisher code passes target adapter and subscribe package, use those values for that row
- otherwise use subscribe-details values
- document any publisher-code override in Notes / Comments
7. Resolve subscribing details for each published message:
- map each subscriber adapter to SYSTEM_NAME
- apply CBR rule interpretation for selected source
- aggregate one-to-many routing into one catalogue row per published message
- derive `Event Group` from matched `subscribe-details.EVENT_GROUP_NAME` rows after applying adapter/CBR filtering
- for `exec_proc_evt` rows, `Event Group` must be populated from the matched subscribe rows (normally `gen_exe_oai`); do not set `Unknown` when at least one subscribe row matches
- populate subscribing columns as comma-separated values for all matched subscribers in this order:
	- Destination DB
	- CBR Rule
	- Subscriber Adapter
	- Subscriber Package
	- Event Group (if multiple groups are present for the same published message)
- keep values distinct and ordered deterministically (alphabetical unless repository evidence requires a specific order)
8. Build markdown output table with exact columns and order.
8a. Create one catalogue record per unique combination of event_type and message_type from publisher code, then aggregate subscriber-side one-to-many routing into that record.
9. Fill unresolved cells as Unknown.
10. Do not add rows for publish metadata entries unless step 4 located the corresponding publisher code in the input system or shared/common repository.
10a. Add mandatory candidate coverage ledger before finalizing output:
- Build selected-source adapter set using adapter-details SYSTEM_NAME = input_system_name.
- Build publish candidate set from publish-details for those adapters.
- For each candidate event, record status: Included, Code Found but Unresolved Field(s), No Publisher Code Found, or Not Applicable with evidence.
- If any candidate has Code Found but not Included, block finalization until resolved or explicitly logged as a gap.
11. Add Open Questions / Gaps entry for every Unknown with:
- row identifier (event_type/event/message_type + publisher package/procedure if known)
- unresolved field names
- concrete next step and where to investigate
12. Write only:
- `<output_file>`
13. Capture skill end time and plan end time in local timezone.
14. Append a `Run Metadata` block at the end of the output file containing `run_started_local`, `run_finished_local`, `run_timezone`, and `repos_scanned` (paths).

## Derivation Rules
- Source DB: always input_system_name.
- Event Type and Message Type: take them from the publisher flow found in code.
- Event key mapping: publisher-code event_type is equivalent to metadata EVENT_NAME for publish/subscribe joins.
- Message key mapping: message_type is separate from event_type/EVENT_NAME and must not be merged into the event key.
- Message Style(Old/New): mark New when the flow uses exec_proc_evt together with p_add_par or p_gen_par_xml style parameters; otherwise mark Old. Example: exec_proc_evt plus target_adapter in code is New. A classic p_gen_xml flow without those overrides is Old.
- Functionality: use a nearby one-line package or procedure comment; otherwise Unknown.
- Publisher Package: use the caller package.procedure where the publish call is invoked.
- Queue Name and Publisher Adapter: take them from publish-details rows that match the selected source and event.
- Subscriber-side fields: first resolve subscribers from subscribe-details by event, then apply any new-style publisher override, then aggregate Event Group, CBR Rule, Subscriber Adapter, Subscriber Package, and Destination DB as comma-separated values when multiple subscribers exist.
- `Event Group` value must come from `subscribe-details.EVENT_GROUP_NAME` for the matched subscriber set. If there are multiple matched groups, aggregate them as comma-separated values; if there are no matched subscribe rows, set `Event Group` to `Unknown`.
- For new-style `exec_proc_evt` flows, resolve `Event Group` after applying target-adapter precedence and CBR filtering so the group reflects the actual routed subscriber rows.
- Destination DB: map each Subscriber Adapter through adapter-details before aggregation.
- Old-style `target_stakeholder`: always normalize the catalogue derivation input to `ALL`. If the code passes a specific stakeholder name, treat it as evidence that the runtime may also route to that stakeholder, but still evaluate integration-platform routing as if `ALL` were present so the full subscriber set is considered.

## CBR Interpretation
- CBR rules route based on source passed from publisher.
- Evaluate inclusion/exclusion against selected input_system_name.
- When `target_stakeholder` is involved in old-style flows, treat `ALL` as the baseline routing value for subscriber discovery, even if the code also passes a specific stakeholder name.
- If conditionally ambiguous from available evidence, set Unknown and add gap.

## Row Aggregation Rule
- If one event_type + message_type combination from the selected source is subscribed by multiple systems, keep a single catalogue row for that published message record.
- Do not merge different message_type values under the same event_type into one row; each event_type + message_type pair is its own catalogue record.
- Represent subscriber-side details as comma-separated values in the same row.
- Example: for one event published by the selected source and subscribed by multiple destination systems, keep one row and aggregate subscriber-side fields as comma-separated values.

## Validation Checklist
1. Every row has code plus CSV evidence references.
2. Headers exactly match required names and order.
3. New-style rows use code-passed target adapter and subscribe package.
4. One row per published message; one-to-many subscriber routing is represented in comma-separated subscribing columns.
5. Every Unknown is tracked in Open Questions / Gaps.
6. Output path is exactly `<output_file>`.
7. No extra artifacts produced.
8. Repository scans did not exclude Oracle source evidence merely because it was stored in `.pkb`, `.pks`, `.trg`, or another non-`.sql` extension.
9. Output ends with the required `Run Metadata` block containing `run_started_local`, `run_finished_local`, `run_timezone`, and `repos_scanned` (paths).
10. The candidate coverage ledger exists and every selected-source publish-details candidate has a recorded status with evidence.
11. At least one explicit search pass covered p_pub_genv_xml and constant-driven event naming patterns.
12. Any event present in publish-details for selected source adapters that has repository publisher code is either included as a row or explicitly listed as a gap with reason.
13. `exec_proc_evt` rows do not leave `Event Group` as `Unknown` when matched subscribe-details rows exist.

## Failure Handling
- If selected stakeholder repo path is missing, continue with available evidence and mark impacted fields Unknown.
- If metadata entries are missing for an event, keep the row with Unknown fields and add concrete next-step lookup guidance.
- If scan completeness checks fail (for example unresolved candidate coverage), do not silently finalize; report blocked status and list exact missing verifications.
