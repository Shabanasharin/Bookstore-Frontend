//All API calls

import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register API call
export const registerAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

//Login API call
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//Add book API call
export const addBookAPI = async(reqBody, reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/book/add`,reqBody,reqHeader)
}

//get all books API call
export const allBooksAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/book/all-books?search=${searchKey}`,"",reqHeader)
}

//update book details api
export const updateBookAPI = async(bookId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/book/update-book/${bookId}`,reqBody,reqHeader)
}

//delete book api
export const deleteBookAPI = async(bookId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/book/delete-book/${bookId}`,{},reqHeader)
}

//Add order API call
export const addOrderAPI = async(reqBody, reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/order/add`,reqBody,reqHeader)
}

export const userOrderAPI =  async(reqHeader,user)=>{
    return await commonAPI("get",`${baseUrl}/order/view`,"",reqHeader)
}

export const updateOrderAPI = async(orderId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/order/update/${orderId}`,reqBody,reqHeader)
}

//get home books API
export const homeBooksAPI = async() =>{
    return await commonAPI("get",`${baseUrl}/home-books`,"","")
}

export const allUsersAPI =  async(searchKey,reqHeader,user)=>{
    return await commonAPI("get",`${baseUrl}/all-users?search=${searchKey}`,"",reqHeader)
}

export const allUsersOrdersAPI =  async(reqHeader,user)=>{
    return await commonAPI("get",`${baseUrl}/order/all-orders`,"",reqHeader)
}
