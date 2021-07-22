import React, {Component} from 'react';
import Dino from '../../layout/img/ToBeImplementedDino.svg'
import styles from './tobeimplemented.module.css'

class ToBeImplemented extends Component {
    render() {

        return (
            <div className={styles.toBeImplemented}>
                <h1>Oh no! This still has to be implemented</h1>
                <img src={Dino} className={styles.dino} alt=""></img>
            </div>
        )
    }
}

export default ToBeImplemented