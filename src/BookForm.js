import { useEffect, useState } from "react";
import BookList from "./BookList";

let timeout;

const Bookform = () => {
    
        const [title, setTitle] = useState("");
        const [author, setAuthor] =useState ("");
        const [isbn, setIsbn] =useState ("");
        const local_storage_key = "bookList";
        const [bookList, setbookList] = useState(JSON.parse(localStorage.getItem(local_storage_key)) ?? []);
        const [error, setError] = useState(false);
       
    const handleSubmit = (e)=>{
        e.preventDefault();

        const newBook = (title, author, isbn)

        if (newBook === "" ) {
            // alert("Please fill in all the forms")
            setError(true)

            if (timeout){
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    setError(false)
                }, 3000);
                
            }else{
                timeout = setTimeout(() => {
                    setError(false)
                }, 3000);
            }
            
        } else {
            setbookList([...bookList,{
                title,
                author,
                isbn,
              
        }])
            setTitle("");
            setAuthor("");
            setIsbn("");

            localStorage.setItem(local_storage_key, JSON.stringify([...bookList, {title,
                author,
                isbn}]));
        }
    }

    const handleDelete = (isbn)=>{
        
        const newBookList = bookList.filter(book=> book.isbn !== isbn)
         
         setbookList(newBookList)
         
         localStorage.setItem(local_storage_key, JSON.stringify(newBookList));
     }
    
    // useEffect(() => {
    //   localStorage.setItem(local_storage_key, JSON.stringify(bookList));
    // }, [bookList])
    
    return ( 
        <div className="container">
            
        
            {error && <div className="error">Please fill in all the forms</div>}
            {/* {error && <div></div>} */}

            <h1>Add Book</h1>
            <form id="book-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" id="title" className="u-full-width" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>

                <div>
                    <label>Author</label>
                    <input type="text" id="author" className="u-full-width" value={author} onChange={(e)=>setAuthor(e.target.value)}/>
                </div>

                <div>
                    <label>ISBN#</label>
                    <input type="number" id="isbn" className="u-full-width" value={isbn} onChange={(e)=>setIsbn(e.target.value)}/>
                </div>

                <input type="submit" value="Submit" className="u-full-width"  />
            </form>

                        <table className="booklist-headings">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>ISBN</th>
                                </tr>
                            </thead>
                        </table>

            <BookList  
            bookList={bookList} 
            removeBook={handleDelete} />
            
        </div>
     );
}
 
export default Bookform;