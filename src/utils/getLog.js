module.exports = (
  {
    params = {},
    body = {},
    url = '',
    method = '',
    statusCode = '',
    message = ''
  },
  isError = false
) => {
  const log = `Request ${method} ${url}${
    isError ? ` resulted with code ${statusCode} (${message})` : ''
  }`;
  const bodyLog = `Request body: ${JSON.stringify(body)}`;
  const paramsLog = `Query params: ${JSON.stringify(params)}`;

  return `${log}. ${bodyLog}. ${paramsLog}.`;
};
