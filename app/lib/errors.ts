export class ApiError extends Error {
  response: unknown;
  status: number;
  statusText: string;
  url: string;

  constructor(
    public _status: number,
    public _statusText: string,
    _response: unknown,
    _url: string,
  ) {
    super();
    this.status = _status;
    this.statusText = _statusText;
    this.response = _response;
    this.url = _url;
  }

  toString() {
    return `Request to ${this.url} failed with ${this.status} ${this.statusText}`;
  }
}
