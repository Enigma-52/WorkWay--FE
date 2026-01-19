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

export function getCompanyOverview({
  fetchRequest,
}: {
  fetchRequest: Request;
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/overview`,
    useAuth: false,
    fetchRequest,
  });
}

export function getAllCompanies({
  fetchRequest,
  q,
  page,
  limit,
  letter,
  hiring,
}: {
  fetchRequest: Request;
  q: string;
  page: string;
  limit: string;
  letter: string;
  hiring: string;
}) {
  return get({
    url: `${COMPANY_API_PREFIX}/`,
    useAuth: false,
    fetchRequest,
    query: { q, page, limit, letter, hiring },
  });
}
