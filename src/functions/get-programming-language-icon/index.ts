import { PROGRAMMING_LANGUAGES } from '../../@types'

export const getProgrammingLanguageIcon = (language: PROGRAMMING_LANGUAGES) => {
  const BASE_URL = 'https://d1n7d4xz7fr8b4.cloudfront.net/'

  const LOGOS: Record<PROGRAMMING_LANGUAGES, string> = {
    [PROGRAMMING_LANGUAGES.JAVA]: `${BASE_URL}java.svg`,
    [PROGRAMMING_LANGUAGES.GO]: `${BASE_URL}go.svg`,
    [PROGRAMMING_LANGUAGES.JAVASCRIPT]: `${BASE_URL}nodejs.svg`,
    [PROGRAMMING_LANGUAGES.PYTHON]: `${BASE_URL}python.svg`,
    [PROGRAMMING_LANGUAGES.DOTNET]: `${BASE_URL}dotnet.svg`,
    [PROGRAMMING_LANGUAGES.MYSQL]: `${BASE_URL}mysql.svg`,
    [PROGRAMMING_LANGUAGES.NGINX]: `${BASE_URL}nginx.svg`,
    [PROGRAMMING_LANGUAGES.IGNORED]: '', // TODO: good icon
    [PROGRAMMING_LANGUAGES.UNKNOWN]: '', // TODO: good icon
    [PROGRAMMING_LANGUAGES.PROCESSING]: '', // TODO: good icon
    [PROGRAMMING_LANGUAGES.NO_CONTAINERS]: '', // TODO: good icon
    [PROGRAMMING_LANGUAGES.NO_RUNNING_PODS]: '', // TODO: good icon
  }

  return LOGOS[language]
}
