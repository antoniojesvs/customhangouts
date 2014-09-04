

var emoticons = {
    all_packages:null
}
var lang;

// Restores select box state to saved value from localStorage.
function restore_options() {

  showPackages();
}


function showPackages() {
  var allPacks = emoticons['all_packages'];
  var packsTable = $('<table></table>');
  var row = $('<tr></tr>');
  for (var pack in allPacks) {
        if(allPacks[pack]['name']) {
            row.append(
                $('<td></td>')
                    .attr('colspan', 4)
                    .addClass('package')
                    .data('packName', allPacks[pack]['name'])
                    .append(
                        $('<p></p>')
                            .append(
                                $('<img></img>')
                                    .attr('src', allPacks[pack]['image'])
                                    .addClass('smileyPack')
                            )
                    )
                    .append(
                        $('<p></p>')
                            .addClass('text')
                            .html(allPacks[pack]['name'])
                    )
                            
            )
            if (row.children().length == 4) {
                packsTable.append(row);
                row = $('<tr></tr>');
            }
        }

  }
  if (row.children().length) {
      for (var empty = row.children().length; empty < 4; ++empty) row.append($('<td><td>'))
        packsTable.append(row);
  }
    $('#packages').html(packsTable);


  $('.package').off('click').on('click', function() {
    if(!$(this).children().eq(0).children().eq(0).hasClass('inactive')) {
        var isActive = $(this).hasClass('active');
        $('.package').removeClass('active');
        if (!isActive) {
            $(this).addClass('active');
            showPackageEmoticons($(this).data('packName'));
        } else {
            $('#peField').hide();
        }
    }
  })
  $('#peField').hide();
}

function showPackageEmoticons(packName, show) {
    if (show == null) show = true;
    $('#peField').show()
    $('#peName').html(texts['emotislist'][lang]+": "+packName)
    var allPacks = emoticons['all_packages'];
    var done = false;
    var packEmotis;
    for (var i = 0; i < allPacks.length && !done; ++i) {
        if (allPacks[i]['name'] == packName) {
            packEmotis = $.extend({}, allPacks[i]['emoticons']);
            done = true;
        }
    }
    var shortChanges = JSON.parse(emoticons['shortcuts_changes'] || '{}');
    for (var sc in shortChanges) {
        if (packEmotis[sc] && sc != shortChanges[sc]) {
            packEmotis[shortChanges[sc]] = packEmotis[sc];
            delete packEmotis[sc]
        }
    };

    var sorti = function (a, b) {
        anum = a.match(/\d+/);
        bnum = b.match(/\d+/);    
        if (anum) a = a.replace(anum[0], '');
        if (bnum) b = b.replace(bnum[0], '');

        return a == b ? (anum > bnum?1:-1): a.toLowerCase() > b.toLowerCase() ? 1:-1
    }
    var emotis = Object.keys(packEmotis).sort(sorti);

    var packEmotisTable = $('<table></table>');
    var row = $('<tr></tr>');
    for (var i in emotis) {
        if (!!packEmotis[emotis[i]].match(/gif|jpe?g|png/)) {
            row.append(
                $('<td></td>')
                    .attr('colspan', 4)
                    .addClass('emoti')
                    .append(
                        $('<p></p>')
                            .append(
                                $('<img></img>')
                                    .attr('src', packEmotis[emotis[i]])
                                    .addClass('smileyEmoti')
                            )
                    )
                    .append(
                        $('<p></p>')
                            .addClass('text emotiName')
                            .html(emotis[i])
                            .data('oldName', emotis[i])
                    )
                            
            )
            if (row.children().length == 3) {
                packEmotisTable.append(row);
                row = $('<tr></tr>');
            }
        }

    }
    if (row.children().length) {
      for (var empty = row.children().length; empty < 3; ++empty) row.append($('<td><td>'))
        packEmotisTable.append(row);
    }
    $('#packageEmoticons').html(packEmotisTable);
    $('#packageEmoticons').data('packName', packName);
    if (show) document.location = '#peField';

}











