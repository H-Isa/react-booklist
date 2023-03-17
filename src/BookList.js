import { useState } from "react"

const BookList = ({bookList, removeBook}) => {

    const deleteBook = (isbn)=>{
        removeBook(isbn)
    }

    return (
        <div> 
            {bookList.map((book)=>{
                const {title, author, isbn} = book;
                return(
                <div className="booklist-container" key={isbn}>    
                    <table>
                        <tr >
                            <td>{title}</td>
                            <td>{author}</td>
                            <td>{isbn}</td>
                        </tr>
                    </table>
                    <span onClick={()=>deleteBook(isbn)}>X</span>
                </div>
                )
            })}
        </div>
     );
}
 
export default BookList;