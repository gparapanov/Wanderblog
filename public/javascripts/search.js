/**
 * Created by Biswas on 20/11/2015.
 */
$(function(){
    changeSearchCategory = function(){
        if($('#select_search_category').val() == 'users'){
            $('#refine_adventure_search').hide();
        }else{
            $('#refine_adventure_search').show();
        }
    }
    changeSearchCategory();
});