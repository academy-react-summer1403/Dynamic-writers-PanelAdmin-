import http from '../../Interceptor'

export const GetUserList = async (SortType, SortingCol, Query, PageNumber, RowsOfPage, IsActiveUser, IsDeletedUser, currentRole) => {
    const response = await http.get(`/User/UserMannage?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&SortingCol=${SortingCol}&SortType=${SortType}&Query=${Query}${IsActiveUser !== null ? `&IsActiveUser=${IsActiveUser}` : ''}${IsDeletedUser !== null ? `&IsDeletedUser=${IsDeletedUser}` : ''}&roleId=${currentRole.value}`)
    return response
}