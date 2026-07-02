/** Determines whether a lesson session counts as "complete" and computes
 * a 0-100 completion percentage from tracked section visits. */

export function computeCompletion(totalSections, visitedSectionIds) {
  const visited = new Set(visitedSectionIds);
  const visitedCount = [...visited].filter((id) => id < totalSections).length;
  const percentage = totalSections === 0 ? 0 : Math.round((visitedCount / totalSections) * 100);
  return { visitedCount, totalSections, percentage, isComplete: percentage >= 100 };
}
