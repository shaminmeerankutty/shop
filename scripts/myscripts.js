/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Controlling the progress bar
$('.progress').hide();
//Add a new item row
$("#addrow").click(function () {
    var newitem = '<tr class="item-row"><td><span class="id">' + ($(".item-row").length + 1) + '</span></td><td><input class="name" type="text" placeholder="Name"></td><td><span class="cost">0</span></td><td><input class="qty" type="number" placeholder="0"></td><td><span class="price">0</span></td><td><a class="delete" href="javascript:;" title="Remove row">X</a></td></tr>';
    $(".item-row:last").after(newitem);
    if ($(".delete").length > 0)
        $(".delete").show();
    bind();
});
//Delete an item row
$(document.body).on('click', '.delete', function () {
    $(this).parents('.item-row').remove();
    if ($(".delete").length < 2)
        $(".delete").hide();
});
$(document.body).on('keyup', ".qty", update_price);
$(document.body).on('keyup', ".name", search);
//Hide and show delete button
if ($(".delete").length < 2)
{
    $(".delete").hide();
}
//Update the final price qty*cost
function update_price() {
    var row = $(this).parents('.item-row');
    var price = row.find('.cost').text() * row.find('.qty').val();
    isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html("" + price);
}
//Search name of item
function search()
{
    var row = $(this).parents('.item-row');
    if (row.find('.name').val() !== "")
    {
        var formvalues = "&term=" + row.find('.name').val() + "&no=" + row.index('.item-row');
        $.ajax({
            type: 'POST',
            url: 'getitem.php',
            data: formvalues,
            beforeSend: function (html) {
                $('.progress').show();
            },
            success: function (html) {
                $('.progress').hide();
                $('#results').html(html);
            }
        });
    } else
    {
        clearresults();
    }
}

function clearresults()
{
    $('#results').html(null);
}

$("#results").on('click', "a", function () {
    var rowno = $(this).attr('class').replace('row', '');

    var row = $('.item-row').eq(rowno);
    var slno = row.find('.id').text();
    
    var itemid = $(this).attr('data-id');
    

    var formvalues = "&id=" + itemid + "&slno=" + slno;
    console.log(formvalues);
    $.ajax({
        type: 'POST',
        url: 'getitemdetails.php',
        data: formvalues,
        beforeSend: function (html) {
            $('.progress').show();
        },
        success: function (html) {
            $('.progress').hide();
            row.html(html);
        }
    });
    clearresults();
});


