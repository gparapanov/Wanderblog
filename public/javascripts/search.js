/**
 * Created by Biswas on 20/11/2015.
 */
$(function(){
    changeSearchFilter = function(){
        $('.search_filters input').attr('disabled', 'disabled');
        $('.search_filters').hide();
        $('#search_filter_'+$('#search_filter_options').val()).show();
        $('#search_filter_'+$('#search_filter_options').val() +' input').removeAttr('disabled');
    }
    changeSearchFilter();
});