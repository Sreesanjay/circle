import "./SearchBox.css"
import { SearchIcon } from "../../assets/Icons";

export default function SearchBox() {
     return (
          <div className="search-box md:w-1/2">
               <input
                    type="text"
                    name="text"
                    className="input"
                    id="input"
                    placeholder="Search"
               />
               <label htmlFor="input" className="labelforsearch">
                    <SearchIcon />
               </label>
               <div className="border" />
          </div>
     );
}
