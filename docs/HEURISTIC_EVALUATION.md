# Nielsen evaluation — redesign

Expert inspection plus automated browser checks; no claim of real-user testing. Severity uses 1 cosmetic, 2 moderate, 3 major, 4 critical.

| Heuristic                | Risk                                                   | Severity | Resolution                                                                         |
| ------------------------ | ------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------- |
| Visibility of status     | Visitor loses assessment position                      | 2        | Accurate current/total and percentage, including conditional branch                |
| Match with real world    | Visitors cannot name the right service                 | 3        | Business-language roadblocks map to explained opportunities                        |
| Control and freedom      | Wrong answer or accidental navigation                  | 2        | Back, skip, revise, restart and session answer restoration                         |
| Consistency              | Ad hoc UI and unrelated effects                        | 2        | Shared semantic color/shape/type/motion tokens, native controls                    |
| Error prevention         | Excess priority selections                             | 2        | Three-item maximum and inline notice, preserving existing selection                |
| Recognition over recall  | Service jargon without context                         | 2        | Explicit service chips, problem explanation and supporting copy                    |
| Efficiency               | Mouse-only interactions                                | 2        | Native radio/checkbox controls, arrow/Home/End tabs, Escape navigation             |
| Aesthetic/minimal design | Previous design lacked agency imagery and hierarchy    | 3        | Replaced homepage composition, typography and visuals; restrained media and motion |
| Error recovery           | False submission or invisible failure                  | 3        | No fake form send; summary explicitly says nothing was submitted                   |
| Help/documentation       | Visitors mistake suggestions for diagnosis or evidence | 3        | Preliminary-summary disclaimer and explicit studio-concept labels                  |

Additional corrections: darker solution-tab metadata after contrast audit; responsive footer typography and concept overlays after screenshot review. Cursor overlay cannot intercept interactions and is disabled for touch/reduced motion. Viewport and asset-loading checks cover the requested widths.

Pending: contact submission, email acceptance/failure/retry, server-side security, complete company privacy policy, manual screen-reader audit and real-user evaluation.
