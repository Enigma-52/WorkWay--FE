import { get } from "~/api/api";

const JOB_API_PREFIX = '/api/job';

export function getJobDetails({
  fetchRequest,
  slug,
}: {
  fetchRequest: Request;
  slug: string;
}) {
  return get({
    url: `${JOB_API_PREFIX}/details`,
    useAuth: false,
    fetchRequest,
    query : { slug }
  });
}
