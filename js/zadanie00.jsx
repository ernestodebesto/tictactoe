import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    class BookInfo extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                title : false,
            };
        }

        componentDidMount(){
            fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.isbn}`)
                .then( r => r.json() )
                .then( data => {
                    if (!data || !data.items || !data.items[0]){
                        this.setState({
                            title : 'Nie ma książki o podanym ISBN.',
                        });
                    } else {
                        const title = data.items[0].volumeInfo.title;
                        this.setState({
                            title,
                        });
                    }
                } );
        }

        render() {
            if (this.state.title === false){
                return null;
            }

            return <h1>{this.state.title}</h1>;
        }
    }

    ReactDOM.render(
        <BookInfo isbn="7777777"/>,
        document.querySelector('#app')
    );
});
