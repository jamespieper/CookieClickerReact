import React from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

export default function Achievement({ achievementList }) {

    const list = achievementList

    
    return (
        <div>
            <ListGroup>
                {list.map((user) => {
                            return (
                                <ListGroup.Item style={{display: 'flex', alignItems: 'center'}}>

                                    {user}

                                </ListGroup.Item>
                            )
                        })}
            </ListGroup>
        </div>
    )
}