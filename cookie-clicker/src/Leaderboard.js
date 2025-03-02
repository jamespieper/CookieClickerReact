import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, ListGroup } from 'react-bootstrap'

import { db } from './firebase'
import { collection, getDocs, getDoc, updateDoc, doc, query, where, setDoc, increment } from 'firebase/firestore'


import './Leaderboard.css'

export default function Leaderboard({ userList }) {



    const users = userList


    return (
        <>

            <Card style={{backgroundColor: ''}}>
                <Card.Title id='title-leaderboard' className='text-center mt-4'>
                    LEADERBOARD
                </Card.Title>

                <Card.Body>
                    <ListGroup numbered={true}>
                        {users.map((user) => {
                            return (
                                <ListGroup.Item style={{display: 'flex', alignItems: 'center'}}>

                                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                                        <h5 style={{marginLeft: '10px', marginBottom: '0'}}>{user.name}</h5>

                                        <h4 style={{marginBottom: '0'}}> {user.cookies.toLocaleString()}</h4>
                                    </div>


                                   

                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    )

}