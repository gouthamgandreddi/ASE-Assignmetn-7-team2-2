import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {parseHttpResponse, post} from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsUpdated = new Subject<Post[]>();
  private posts:Post [] = [];
  constructor(private http:HttpClient) { }

  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
      .pipe(map((postData)=>{
        console.log(postData,'postData');
        return postData.posts.map(post =>{
          return {
            title: post.title,
            content: post.content,
            id:post._id
          };
        });
      }))
      .subscribe((transformedPosts) =>{
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePosts(postId: string){
    console.log('service -',postId);
    this.http.delete('http://localhost:3000/api/posts/'+postId)
      .subscribe(()=>{
        console.log("Deleted");
        this.getPosts();
      })
  }
  getPostUpdatelistner(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(p =>p.id === id)};
  }

  updatePost(id:string,title:string,content:string){
    const post: Post = {id:id,title:title,content:content}
    this.http.put('http://localhost:3000/api/posts/'+id,post)
      .subscribe(response => {
        this,this.getPosts();
        console.log('response',response)
      });
  }
  addPosts(title:string,content:string){
    var post:Post ={id:null,title:title,content:content};
    this.http.post<{message:string,id:string}>('http://localhost:3000/api/posts',post)
      .subscribe((postData) =>{
        post.id=postData.id;
        console.log(postData.message);
        console.log('new post with  id', post);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      },error =>{
        console.log(error);
      })
  }
}
