import { get } from "~/api/api";

const DOMAIN_API_PREFIX = '/api/filter/domain';

export function getDomainJobs({
  fetchRequest,
  slug,
  page = 1,
    employment_type = "all",
    employment_level = "all",
    location = "all",
}: {
  fetchRequest: Request;
  slug: string;
    page?: number;
    employment_type?: string;
    employment_level?: string;
    location?: string;
}) {
  return get({
    url: `${DOMAIN_API_PREFIX}/`,
    useAuth: false,
    fetchRequest,
    query : { slug , page, employment_type, employment_level, location }
  });
}

export function getAllDomainDetails({
  fetchRequest,
}: {
  fetchRequest: Request;
}) {
  return get({
    url: `${DOMAIN_API_PREFIX}/all`,
    useAuth: false,
    fetchRequest,
  });
}
