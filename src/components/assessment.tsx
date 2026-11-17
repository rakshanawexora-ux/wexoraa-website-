"use client";
import SolutionCheck from "./solution-check";
export default function Survey(_props: { configured?: boolean }) {
  void _props; // Preserve the existing caller contract during this local change.
  return (
    <div className="assessment-shell">
      <SolutionCheck source="Detailed assessment" />
    </div>
  );
}
