let api = process.env.API_PATH;
export default  {
    GET_AUTH: `${api}/api/auth/login`,
    STORY: `${api}/api/stories`,
    PRODUCT: `${api}/api/products`,
    MEMBER: `${api}/api/members`,
    LOG: `${api}/api/logs`,
    UPLOAD: `${api}/api/image/UpToken`,
    BACKGROUND: `${api}/api/image/BackGroundImageUrls`,
    DOMAIN:`${api}/api/image/PlaceAndDomain`
}
