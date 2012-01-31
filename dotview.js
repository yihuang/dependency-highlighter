var gs = {};
function build() {
    $('g').each(function(){
        var title = $(this).children().eq(0).text();
        gs[title] = this.id;
    });
    $('g.edge').each(function(){
        var title = $(this).children().eq(0).text();
        var fromto = title.split('->');
        var from=$('#'+gs[fromto[0]]).get(0), to=$('#'+gs[fromto[1]]).get(0);
        $(this).data('from', from.id);
        $(this).data('to', to.id);
        if( $(from).data('output') ) {
            $(from).data('output').push(this.id);
        }
        else {
            $(from).data('output', [this.id]);
        }
        if( $(to).data('input') ) {
            $(to).data('input').push(this.id);
        }
        else {
            $(to).data('input', [this.id]);
        }
    });
}

function highlight(g) {
    console.log(g);
    var self;
    if( $.type(g) === 'string' ) {
        self = $('#'+g);
    }
    else {
        self = $(g);
    }
    self.children(':not(title)').each(function(){
        if( this.tagName == 'polygon') {
            // arrows.
            $(this).attr({
                'fill': 'red',
                'stroke': 'red'
            });
        }
        else {
            $(this).attr('stroke', 'red');
        }
    });
}

$(function(){
    build();
    console.log('build complete.');
    $('svg').delegate('g', 'click', function(e){
        if($(this).attr('class')==='graph') {
            return;
        }
        console.log(this);
        var tohl = [this]
        $.map($(this).data('input')||[], function(edge){
            var elm = $('#'+edge);
            tohl.push( elm[0] );
            tohl.push( $('#'+elm.data('from'))[0] );
        });
        $.map($(this).data('output')||[], function(edge){
            var elm = $('#'+edge);
            tohl.push( elm[0] );
            tohl.push( $('#'+elm.data('to'))[0] );
        });
        $.map(tohl, highlight);
    });
});
