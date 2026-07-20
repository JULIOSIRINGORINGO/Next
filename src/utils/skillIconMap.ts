import type { IconType } from 'react-icons';
import { skillIconData, fallbackEntry, nameToSlug, type SkillIconEntry } from './skillIconMeta';

export type { SkillIconEntry };

// ponytail: sync import — dynamic import broke icon rendering, react-icons stays in shared chunk
import { iconRegistry } from './iconRegistry';

export function loadIcon(iconName: string): IconType | null {
  return iconRegistry[iconName] || null;
}

export { skillIconData, fallbackEntry, nameToSlug };

export function getSkillIconData(slug: string): SkillIconEntry {
  const key = slug.toLowerCase().trim();
  const resolved = nameToSlug[key] || key;
  return skillIconData[resolved] || skillIconData[key] || fallbackEntry;
}

export default skillIconData;
