# Nielsen heuristic evaluation — complete page flow

Expert inspection with automated tests; no real-user testing claim. Severity: 1 cosmetic, 2 moderate, 3 major, 4 critical.

| Heuristic            | Observed risk                                | Severity | Correction/status                                                                   |
| -------------------- | -------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| Visibility of status | Survey/email state unclear                   | 3        | Current question/total, score coverage, sending, failure and accepted-only feedback |
| Real-world match     | Visitors cannot name a service               | 3        | Business-language questions and per-service challenge/approach/deliverables         |
| Control/freedom      | Incorrect selection or submission failure    | 2        | Back, revise, clear, optional lead capture and preserved inputs on retry            |
| Consistency          | Isolated homepage sections and missing pages | 3        | Shared page templates, full route navigation and common UI tokens                   |
| Error prevention     | Misleading score or forged client summary    | 3        | Unknown exclusions, coverage minimum, explained rubric and server recalculation     |
| Recognition          | Remembering answers/services                 | 2        | Selected controls, category summaries, evidence and contextual enquiry              |
| Efficiency           | Mouse-only discovery                         | 2        | Native radios/checkboxes, keyboard tabs, visible focus and mobile disclosure        |
| Minimalism           | Motion/decorative overload                   | 2        | Bounded pointer/scroll effects with reduced-motion alternatives                     |
| Error recovery       | Fake email success/lost input                | 3        | No success without provider ID; values survive failure; retry/idempotency           |
| Help/documentation   | Unclear follow-up or privacy                 | 3        | What-happens-next copy, consent, methodology, privacy and configuration notice      |

Remaining external limitations: no verified sender/recipient/contact values, live provider send, approved legal/privacy details, distributed protection, manual screen-reader testing or deployed performance evidence. The interface does not hide those limitations or fabricate proof.
