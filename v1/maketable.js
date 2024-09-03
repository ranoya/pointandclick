/**
 *
 * AMS MAKETABLE
 * Guilherme Ranoya, 2020
 *
 * Essa funÃ§Ã£o produz uma tabela com os dados
 * obtidos em uma simplequery no AMS
 *
 * Cada cabeÃ§alho da tabela criado recebe a classe CSS .maketableheader
 * e uma classe com o prÃ³prio nome da coluna no AMS
 *
 * Cada cÃ©lula recebe a classe .maketablecel, uma classe com o nome da
 * linha (Ex. .linha5) e com o prÃ³prio nome da coluna no AMS. O conteÃºdo
 * da cÃ©lula Ã© colocado em um <div> com a classe .maketableconteudo, e,
 * se tratando de um link, a tag <a> recebe a classe.maketablelink
 *
 *
 * Como usar:
 *
 * maketable(URLQuerydoAMS, ElementoHTML);
 *
 * Exemplo:
 *
 * maketable("https://www.ranoya.com/AssetsManager/simplequery/pointnclickadv.php?filter=pncadv", "listapointandclick");
 *
 **/

function maketable(url, el) {
  var popula = "";

  // FUNÃ‡ÃƒO DE FETCH DE ARQUIVO JSON

  fetch(url)
    .then((response) => response.json())
    .then((dados) => {
      console.table(dados);

      for (var header in dados[0]) {
        popula = popula + "<div class='maketableheader " + header + "'>";
        popula = popula + header;
        popula = popula + "</div>";
      }

      for (var linha = 0; linha < dados.length; linha++) {
        for (var key in dados[linha]) {
          popula =
            popula +
            "<div class='maketablecel linha" +
            linha +
            " " +
            key +
            "'>";
          if (dados[linha][key] != "" && dados[linha][key] != undefined) {
            popula = popula + "<div class='maketableconteudo'>";
            if (dados[linha][key].indexOf("http") >= 0) {
              popula =
                popula +
                "<a target='_blank' class='maketablelink' href='" +
                dados[linha][key] +
                "'>" +
                dados[linha][key] +
                "</a>";
            } else {
              popula = popula + dados[linha][key];
            }
            popula = popula + "</div>";
          }
          popula = popula + "</div>";
        }
      }

      document.getElementById(el).innerHTML = popula;
    });
}
