import React from 'react'
import c from './Description.module.css'
import IconButton from '../../core/button/IconButton';
import moment from 'moment';

//MUI
import { Card, CardHeader, CardContent, CardActions, Typography } from "@material-ui/core/";




const Description = ({ post, update, deleting, compare, options, toggle, isSame, setSame }) => {
    const updatePost = () => {
        toggle();
        update(post)
    };
    const deletePost = () => deleting(post);
    const comparePost = () => compare(post);




    return (
        <Card className={c.items}>
            <CardHeader
                title={options['title'].isChecked ?
                    <h4 className={c.items_title}>{post.title}</h4> : null}
                subheader={options['createAt'].isChecked ?
                    <div className={c.items_date}>
                        <div className={c.date_and_time}>{post.createAt ? moment(post.createAt).format('MMMM Do YYYY, h:mm:ss a') : ''}</div>
                    </div> : null}
            />

            <CardContent>
                <Typography variant='body2' color='textPrimary' component='span'>
                    {options['description'].isChecked ?
                        <div className={c.items_text}>{post.body}</div> : null}
                </Typography>
            </CardContent>
            <CardActions >
                {!isSame ?
                    <div className={c.buttonBlock}>
                        <IconButton title='Top same' onClick={comparePost} icon="compare" />
                        <IconButton title='Edit' onClick={updatePost} icon="edit" />
                        <IconButton title="Delete" className={c.button_delete} onClick={deletePost} icon="delete" color="red" />
                    </div> :
                    <IconButton title="All posts" onClick={() => setSame(false)} icon="list" />
                }
            </CardActions>
        </Card>
    )
}


export default Description;