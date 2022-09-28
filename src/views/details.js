import {
  deleteBook,
  getBookById,
  getLikesByBooksId,
  getMyLikeByBookId,
  likeBook,
} from "../api/books.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  book,
  isOwner,
  onDelete,
  likes,
  showLikeBtn,onLike
) => html` <section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      ${isOwner
        ? html` <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="/">Delete</a>`
        : ""}
      
      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
      ${showLikeBtn ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`:""}
      
      <!-- ( for Guests and Users )  -->
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>

      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function detailsView(ctx) {
  const userData = getUserData();
  
  const [book, likes, hasLike] = await Promise.all([
    getBookById(ctx.params.id),
    getLikesByBooksId(ctx.params.id),
    userData ? getMyLikeByBookId(ctx.params.id, userData.id) : 0,
  ]);

  const isOwner = userData?.id == book._ownerId;

  const showLikeBtn = userData != null && isOwner == false && hasLike == false;
console.log(hasLike);
  ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn,onLike));

  async function onDelete() {
        const choice = confirm("Are you sure you want to delete this book?");

    if (choice) {
      await deleteBook(ctx.params.id);
      ctx.page.redirect("/books");
    }
  }
  async function onLike(){
await likeBook(ctx.params.id);
ctx.page.redirect("/books/"+ctx.params.id)

  }
}
