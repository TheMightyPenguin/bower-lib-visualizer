/**
 * These types were copied from:
 * @see https://github.com/ffflorian/api-clients/blob/master/packages/libraries.io/src/interfaces/Project.ts
 *
 * As we're using a single endpoint, there's no need to include the whole package.
 * If this were to change, then it may be useful as it already includes types.
 */

export interface ProjectWithOwner extends Project {
  owner: string;
}

export interface Project {
  dependent_repos_count: number;
  dependents_count: number;
  description: string | null;
  forks: number;
  homepage: string | null;
  keywords: string[];
  language: string;
  latest_download_url: string | null;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number?: string;
  latest_stable_release_published_at?: string;
  latest_stable_release: ProjectRelease;
  license_normalized?: boolean;
  licenses: any;
  name: string;
  normalized_licenses: string[];
  package_manager_url: string | null;
  platform: string;
  rank: number;
  repository_url: string;
  stars: number;
  status: string | null;
  versions: ProjectVersion[];
}

export interface ProjectWithDependencies extends Project {
  dependencies: ProjectDependency[];
  dependencies_for_version: string;
  dependent_repos_count: number;
  dependents_count: number;
}

export interface ProjectDependency {
  deprecated: boolean;
  filepath: string | null;
  kind: 'Development' | 'runtime' | 'Optional';
  latest: string;
  latest_stable: string;
  name: string;
  outdated: boolean;
  platform: PlatformType;
  project_name: string;
  requirements: string;
}

export interface ProjectRelease {
  created_at: string;
  id: number;
  number?: string;
  repository_id: number;
  name: string;
  sha: string;
  kind: string;
  project_id?: number;
  published_at: string;
  runtime_dependencies_count?: number | null;
  updated_at: string;
}

export interface ProjectUsage {
  [version: string]: number;
}

export interface ProjectVersion {
  number: string;
  published_at: string;
}
