import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-story-modal',
  templateUrl: 'story-modal.html'
})

export class StoryModalPage {

   public form          : any;
   public stories       : FirebaseListObservable<any[]>;
   public storyName     : any     = '';
   public storyTags     : any     = [];
   public storySummary  : any     = '';
   public storyMood     : any     = '';
   public storyImage    : any     = '';
   public storyId       : string  = '';
   public isEditable    : boolean = false;


   constructor(
      public navCtrl: NavController,
      public params: NavParams,
      private formBuilder: FormBuilder,
      private ngFire: AngularFire,
      public viewCtrl: ViewController)
   {
      this.form 	    = formBuilder.group({
         'summary' 	    : ['', Validators.minLength(10)],
         'name'         : ['', Validators.required],
         'mood'         : ['', Validators.required],
         'image'	    : ['', Validators.required],
         'tags' 	    : ['', Validators.required]
      });

      this.stories = this.ngFire.database.list('/stories');


      if(params.get('isEdited')) {
          let story 		= params.get('story'),
              k;

          this.storyName        = story.title;
          this.storySummary     = story.summary;
          this.storyMood        = story.mood; 
          this.storyImage   	  = story.image; 
          this.storyId          = story.id;

          console.log("StoryID: " + JSON.stringify(this.storyId)); 

          for(k in story.tags){
             this.storyTags.push(story.tags[k].name);
          }

          this.isEditable      = true;
      }
   }



   saveStory(val) {
      let title	    : string	= this.form.controls["name"].value,
          summary   : string 	= this.form.controls["summary"].value,
          mood   : string 	= this.form.controls["mood"].value,
          tags    : any       = this.form.controls["tags"].value,
          image  : string	= this.form.controls["image"].value,
          types     : any       = [],
  	      k         : any;


            for(k in tags) {
            types.push({
                "name" : tags[k]
                });
            }


        if( this.isEditable){
            this.stories.update(this.storyId, {
                title    : title,
                summary  : summary,
                mood     : mood,
                tags     : types,
                image    : image 
            });
        } else {
            this.stories.push({
                title    : title,
                summary  : summary,
                mood     : mood,
                tags     : types,
                image    : image 
            });
        }

        this.closeModal();
   }



   closeModal() {
      this.viewCtrl.dismiss();
   }


}
