import { get } from "~/api/api";

const COMPANY_API_PREFIX = '/api/company';

export function getCompanyDetails({
  fetchRequest,
  slug,
}: {
  fetchRequest: Request;
  slug: string;
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/details`,
    useAuth: false,
    fetchRequest,
    query : { slug }
  });
}
