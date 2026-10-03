import type { EventFamily } from "@/types/invitation";

export type NormalizedFamily = {
  parents: string[];
  godparents: Array<{ role?: string; names: string[] }>;
};

export function normalizeFamily(family?: EventFamily, parentsFallback?: string[]): NormalizedFamily {
  const parents = (family?.parents ?? parentsFallback)?.filter(name => name.trim()) ?? [];
  const godparents = family?.godparents
    ?.map(group => ({ role: group.role?.trim(), names: group.names.filter(name => name.trim()) }))
    .filter(group => group.names.length) ?? [];

  return { parents, godparents };
}
