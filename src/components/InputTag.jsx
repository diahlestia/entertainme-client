  
import React, { Component } from 'react'

class InputTag extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             tags: ["Horor", "Drama", "Animation", "Comedy", "Adventure"]
        }
        this.inputRef = React.createRef()
    }

    // remove tag
    removeTag = i => {
        const tags = this.state.tags
        tags.splice(i, 1)
        this.setState({
            tags
        })
    }

    // add tag
    addTag = e => {
        const tags = this.state.tags
        const value = e.target.value
        if(e.key === "Enter" && value){
            // check if duplicate skill
            if(tags.find(tag => tag.toLowerCase() === value.toLowerCase())){
                return alert("No duplicate value allowed")
            }
            // else add tag to tags array
            tags.push(value)
            // set new state
            this.setState({
                tags
            })
            // when submit tag, set current input filed null
            this.inputRef.current.value = null
        } else if(e.key === "Backspace" && !value){
            // if no value and hit backspace we will remove previous skill
            this.removeTag(tags.length - 1)
        }
    }
    

    render() {
        const {tags} = this.state
        return (
            <>
                <div className="tag">
                    <ul>
                        { tags.map((tag, i) => {
                            return (
                                <li key={i}> {tag} <button onClick={() => this.removeTag(i)}>+</button> </li>
                            )
                        }) }
                        <li className="input-tag">
                            <input onKeyDown={this.addTag} type="text" size="4" ref={this.inputRef} />
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default InputTag