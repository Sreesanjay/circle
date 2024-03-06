import "./NotFound.css";
export default function NotFound() {
     return (
          <div className="not-found-body">
            <img src="https://i.pinimg.com/originals/fe/df/71/fedf7125acf620e856b6d09ef44eee51.gif" className="w-96 mix-blend-screen" alt="" />
               <h1 className="text-5xl mb-10">Sorry, this page isn't available!.</h1>
               <span className="text-sm mb-5">
                    The link you followed may be broken, or the page may have
                    been removed. 
               </span>
          </div>
     );
}
