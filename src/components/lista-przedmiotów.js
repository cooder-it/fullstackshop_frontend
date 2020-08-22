import React from 'react'
import { Link, useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import './lista-przedmiotów.css'

/*
 Jest to komponent ogólny do wyswietlania notatek
 W zależnosci od przekazanych props wyswietla rózne notatki
 NoteList to komponent który wyświetla dane z komponentu ListaNotatek
Kategorie:
 BIOL = biologia,
CHEM = chemia,
FIZ  = fizyka,
POL  = polski
wymóg API
 */

function ItemList(props) {
    const history = useHistory()
    
    const noteList = props.note_list.map( note=>{
            if(note.title.indexOf(props.query) > -1 ) {
                return(
                    <div key={note.id} className="notatka_container">
                        <div>{note.title}</div>
                        <span>{note.price} $</span>
                        <button onClick={()=>history.push(`szczegóły/${note.id}`)}>
                            Order
                        </button>
                    </div>
                    )
            }
            else {
                return ( <div key={note.id}></div>)
            }
        }
    )
    return (
        <div>{noteList.reverse()}</div>
    )
}

class ListaNotatek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {      
            note_list: [],
            category: "",
            query: ""
        };  
        this.handleSearch = this.handleSearch.bind(this)
    }

    fetchData() {
        fetch(`http://127.0.0.1:8000/api/item_list/`)
        .then(res => res.json())
        .then(data => {
            this.setState({ 
                note_list: data,
             })
        })
        .catch(error => error)
    }

    componentDidMount() {
        this.fetchData()
    }
    handleSearch(e) {
        this.setState({
            query: e.target.value
        })
    }
    render() {
      
        return(
            <div className="notatki_container">
                <div className="notatki_wrapper">
                    <div className="notatki_header">
                        <form action="">
                            <input onChange={ this.handleSearch } type="text" placeholder="Search"/>
                        </form>
                        <div>
                            { this.props.username ? <Link to="add">Add item</Link> : <div><p>Log in to add item</p></div> }
                        </div>
                    </div>
                    <ItemList note_list={ this.state.note_list } query={ this.state.query }/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.userData.username
    }
}


export default connect(mapStateToProps)(ListaNotatek)