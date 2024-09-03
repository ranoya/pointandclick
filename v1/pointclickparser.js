function VideoGridParseURL(url) {
    // - Supported YouTube URL formats:
    // - http://www.youtube.com/watch?v=My2FRPA3Gf8
    // - http://youtu.be/My2FRPA3Gf8
    // - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - https://m.youtube.com/watch?v=My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    // - http://vimeo.com/25451551
    // - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    // - //player.vimeo.com/video/25451551

    var tipovideo = 'none';

    if (url.indexOf('youtu') <= -1 && url.indexOf('vimeo') <= -1) {
        return {
            type: 'none',
            id: 'none'
        };
    } else {
        url.match(
            /(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
        );
        if (RegExp.$3.indexOf('youtu') > -1) {
            tipovideo = 'youtube';
        }

        if (RegExp.$3.indexOf('vimeo') > -1) {
            tipovideo = 'vimeo';
        }

        return {
            type: tipovideo,
            id: RegExp.$6
        };
    }

}

function youtubeImage(url) {


    var thumbSplit = "";
    var retorno = "";
    var thumbSRC;
    var videoDetails = VideoGridParseURL(url);
    var videoType = videoDetails.type;
    var videoID = videoDetails.id;

    return 'https://img.youtube.com/vi/' + videoID + '/0.jpg';


}

/*
URL:
https://www.ranoya.com/AssetsManager/simplequery/pointnclickadv.php?produto=kingsquest&publisher=Sierra
*/

var filtrogeral = "";
var esseano = new Date;
var filtraanostart = 1972;
var filtraanoend = parseInt(esseano.getFullYear());
var anostring = "anoinicial=" + filtraanostart + "&anofinal=" + filtraanoend + "&";
var ordenastring = "";
var inclusoes = "";
var serial = "";
var incluir = "incluir=" + inclusoes + "&";
var inclusoesgenero = "";
var incluirgenero = "genero=" + inclusoesgenero + "&";

function pointnclickpanel(url, el) {


    var popula = "";
    var populaBackground = "";
    var lastano = "";
    var actualano = "";
    var contaslottimeline = 0;
    var actualtipo = "";
    var lasttipo = "";


    // FUNÇÃO DE FETCH DE ARQUIVO JSON

    fetch(url).then(response => response.json()).then((dados) => {
        console.table(dados);

        /*
        popula = `<div style='grid-row-start: 1; grid-row-end: 2;' class="textoriented header">Text Oriented Adventure</div>
                  <div style='grid-row-start: 1; grid-row-end: 2' class="graphicadventure header">Graphic
                      Adventure</div>
                  <div style='grid-row-start: 1; grid-row-end: 2' class="linearadventure header">Linear
                      Adventure</div>
                  <div style='grid-row-start: 1; grid-row-end: 2' class="animation header">Interactive Animation
                  </div>
        `;
        */

        for (var linha = 0; linha < dados.length; linha++) {

            actualano = dados[linha].ano;

            if (dados[linha].textoriented != "") {
                actualtipo = "textoriented";
            }
            if (dados[linha].graphicadventure != "") {
                actualtipo = "graphicadventure";
            }
            if (dados[linha].linearadventure != "") {
                actualtipo = "linearadventure";
            }
            if (dados[linha].animation != "") {
                actualtipo = "animation";
            }
            if (dados[linha].idlegame != "") {
                actualtipo = "textoriented";
            }


            if (actualano != lastano) {

                lastano = actualano;
                contaslottimeline++;

                popula = popula + "<div class='pnctimeline' style='grid-row-start: " + (
                        contaslottimeline) +
                    "; grid-row-end: " + (contaslottimeline + 1) + "'><span class='pncanopivot'>" + (dados[
                        linha].ano) + "</span></div>";

            } else {

                if (actualtipo == lasttipo) {
                    contaslottimeline++;
                }

            }

            popula = popula + "<div class='pncdiagramaelm";
            if (dados[linha].textoriented != "") {
                popula = popula + " pnctextoriented";
                if (dados[linha].sierraagi != "") {
                    popula = popula + " sierraagi";
                }
            }
            if (dados[linha].idlegame != "") {
                popula = popula + " pnctextoriented pncidlegame";
            }

            if (dados[linha].graphicadventure != "") {
                popula = popula + " pncgraphicadventure";
                if (dados[linha].sierrasci != "") {
                    popula = popula + " sierrasci";
                }
                if (dados[linha].scumm != "") {
                    popula = popula + " scumm";
                }
            }
            if (dados[linha].linearadventure != "") {
                popula = popula + " pnclinearadventure outrostipos";
            }
            if (dados[linha].animation != "") {
                popula = popula + " pncanimation outrostipos";
            }


            popula = popula + "' ";

            popula = popula + "style='grid-row-start: " + (contaslottimeline) + "; grid-row-end: " +
                (contaslottimeline + 1) + "'>";

            if (dados[linha].link.indexOf('youtu') > 0) {

                popula = popula + '<a target=\'_blank\' class=\'pncimagelink\' href=\'' + dados[linha]
                    .link +
                    '\'><div style=\"background-image: url(\'' + youtubeImage(dados[linha].link) +
                    '\' );\" class=\'pncthumbitself\'>&nbsp;</div>';

                populaBackground = populaBackground + "<div class=\"backgroundThumbs\" style=\"background-image: url(" + youtubeImage(dados[linha].link) + ");\">&nbsp;</div>";

                popula = popula + "<p class='pnctextlink'><b>" + dados[linha].titulo + "</b>";
                if (dados[linha].subtitulo != "") {
                    popula = popula + "<b class='pnctextsubtitle'>" + dados[linha].subtitulo + "</b>";
                }
                popula = popula + "<br>";
                popula = popula + dados[linha].publisher + "</p>";

                popula = popula + "</a>";

                if (dados[linha].remakelink != "") {
                    popula = popula + "<a class='pncextralink' href='" + dados[linha].remakelink +
                        "' class='pnctextlink'>Remake/Remaster Version</a>";
                }

                popula = popula + "</div>";

            }

            lasttipo = actualtipo;

        }

        document.getElementById(el).innerHTML = popula;
        if (document.getElementById(el + "Background") != null) {
            document.getElementById(el + "Background").innerHTML = populaBackground;

        }
        //document.getElementById(el).style.gridTemplateRows = "repeat(" + contaslottimeline + ", calc(16vw + 70px))";
        document.getElementById(el).style.gridTemplateRows = "repeat(" + contaslottimeline + ")";
    });
}

// Assim que o documento for carregado, ativa as funções

setInterval(xpto, 5);

function refaztabela() {

    url = "https://www.ranoya.com/AssetsManager/simplequery/pointnclickadv.php?" + filtrogeral + ordenastring + anostring + incluir + incluirgenero + serial;

    console.log(url);
    pointnclickpanel(url, "diagramapointandclick");

}

function pncParametricOrdenacao(valor) {

    console.log(valor);
    if (valor) {
        ordenastring = "ordenacao=desc&"
    } else {
        ordenastring = "";
    }

    refaztabela();

}


function pncParametricYStart(valor) {

    filtraanostart = parseInt(1972 + ((valor / 100) * 20));
    document.getElementById('anoinitnumber').innerHTML = filtraanostart;

    anostring = "anoinicial=" + filtraanostart + "&anofinal=" + filtraanoend + "&";

    refaztabela();


}

function pncParametricYEnd(valor) {

    var anoatual = new Date();
    var esteano = anoatual.getFullYear();

    filtraanoend = parseInt(esteano - (20 - (20 * (valor / 100))));

    document.getElementById('anofimnumber').innerHTML = filtraanoend;

    anostring = "anoinicial=" + filtraanostart + "&anofinal=" + filtraanoend + "&";

    refaztabela();



}

function pncParametricLang(qualid, valor) {

    inclusoes = "";
    var osinputs = document.getElementsByClassName("tipologialinguagem");

    for (var i = 0; i < osinputs.length; i++) {
        if (osinputs[i].checked) {

            inclusoes += osinputs[i].id + ",";

        }

    }

    incluir = "incluir=" + inclusoes.slice(0, -1) + "&";

    refaztabela();

}

function pncParametricSerie(qualid, valor) {

    serial = "serial=&";

    if (document.getElementById('produto').checked) {

        serial = "serial=produto&";
    }

    if (document.getElementById('singular').checked) {

        serial = "serial=singular&";
    }

    refaztabela();

}

function pncParametricGen(qualid, valor) {

    inclusoesgenero = "";
    var osinputsgen = document.getElementsByClassName("tipologiagenero");

    for (var i = 0; i < osinputsgen.length; i++) {
        if (osinputsgen[i].checked) {

            inclusoesgenero += osinputsgen[i].id + ",";

        }

    }

    incluirgenero = "genero=" + inclusoesgenero.slice(0, -1) + "&";

    refaztabela();

}

function xpto() {

    if (document.getElementById("diagramapointandclickBackground") != null) {
        document.getElementById("diagramapointandclickBackground").style.top = (-2 * window.scrollY) + "px";
    }

    //console.log(document.getElementById('cabecalho').getBoundingClientRect().top);

    if (document.getElementById('diagramapointandclick').getBoundingClientRect().top < (document.getElementById('cabecalho').getBoundingClientRect().height + 40) && (document.getElementById('diagramapointandclick').getBoundingClientRect().bottom - document.getElementById('cabecalho').getBoundingClientRect().height > 20)) {

        // && (document.getElementById('cabecalho').getBoundingClientRect().bottom > document.getElementById('diagramapointandclick').getBoundingClientRect().height)

        //console.log("eita!");
        document.getElementById('cabecalho').style.position = "fixed";
        document.getElementById('cabecalho').style.top = 0;
        document.getElementById('cabecalho').style.zIndex = 10;
        document.getElementById('emptydummy').style.display = "inline-block";
        document.getElementById('emptydummy').style.height = "calc(18.5vw + 19px)";
        document.getElementById('emptydummy').style.marginBottom = "20px";

    } else {

        document.getElementById('cabecalho').style.position = "static";
        document.getElementById('emptydummy').style.display = "none";
        document.getElementById('emptydummy').style.height = "0";
        document.getElementById('emptydummy').style.marginBottom = "0";

    }

}