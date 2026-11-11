# Heuristic evaluation — homepage phase

Expert inspection and automated testing, not a study with real users. Severity: 0 none observed; 1 cosmetic; 2 moderate; 3 major; 4 critical. Results are scoped to implemented pages.

| Nielsen heuristic               | Finding                                                   | Severity | Correction or status                                                                  |
| ------------------------------- | --------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| Visibility of system status     | Interactive diagrams need clear selection feedback        | 2        | Selected state, aria-pressed, tab state and live summaries implemented                |
| Match with the real world       | Abstract vendor labels could hide capabilities            | 2        | Concrete service lists and business outcomes accompany the diagram                    |
| User control and freedom        | Mobile disclosure needs keyboard dismissal                | 2        | Escape closes navigation and restores toggle focus                                    |
| Consistency and standards       | Multiple interaction styles could fragment the experience | 2        | Shared color, focus, action and spacing tokens                                        |
| Error prevention                | Visitors could mistake concept art for client evidence    | 3        | Per-card labels and a separate disclosure explain illustrative content                |
| Recognition rather than recall  | Users may not know which service fits                     | 2        | Business challenge, three solution areas and conversation path                        |
| Flexibility and efficiency      | Tabs need complete keyboard behavior                      | 2        | Arrow keys, Home/End and roving tab index                                             |
| Aesthetic and minimalist design | Secondary text was too small and pale                     | 2        | Body text enlarged; contrast colors revised after axe findings                        |
| Recognize, diagnose and recover | A pretend enquiry would silently lose leads               | 3        | No submission form until backend is implemented; explicit availability notice         |
| Help and documentation          | Missing contacts and business policies                    | 3        | Preview-only notice and deployment/content checklist; business details remain pending |

Required next-phase evaluation: assessment progress/branching, validation errors, preserved answers, email acceptance/failure/retry, duplicate suppression, spam protections, and privacy disclosure. None of those flows have been tested or claimed complete.
