import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, convertToParamMap, ParamMap, Router, Routes} from '@angular/router';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = "create";
  private postId: string;
  post : Post;
  isLoading = false;
  constructor( public postService:PostsService,private router:Router,
               public route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postService.getPost(this.postId);
      }else {
        this.mode = 'create';
        this.postId = null ;
      }
    });
  }

  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode === 'create'){
      this.postService.addPosts(form.value.title,form.value.content);
      this.router.navigate(['/']);
    }else{
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content);
      this.router.navigate(['/']);
    }
    form.resetForm();
  }
}

