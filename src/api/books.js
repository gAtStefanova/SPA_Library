import { del, get, post, put } from "./api.js";

export async function getAllBooks() {
  return get("/data/books?sortBy=_createdOn%20desc");
}

export async function getBookByUser(userId){
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export async function getBookById(id) {
  return get("/data/books/" + id);
}

export async function createrBook(book) {
  return post("/data/books", book);
}
export async function updateBook(id,book){
    return put('/data/books/'+id,book)
}

export async function deleteBook(id){
    return del('/data/books/'+id)
}
export async function likeBook(bookId){
    return post('/data/likes',{
        bookId
    })
}
export async function getLikesByBooksId(bookId){
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}
export async function getMyLikeByBookId(bookId,userId){
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
export async function searchBooks(query){
return get('/data/books?where='+ encodeURIComponent(`title LIKE "${query}"`))
}
window.getMyLikeByBookId=getMyLikeByBookId