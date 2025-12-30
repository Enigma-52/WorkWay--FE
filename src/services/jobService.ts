import {apiFetch} from "../services/index";

const BASE_JOB_ENDPOINT = "/job";

export async function getJobBySlug(slug: string) {
    const data = await apiFetch(`${BASE_JOB_ENDPOINT}/details`, {
    method: "GET",
    query: { slug },
  });
  return data;
}