/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-10 Old tag
Mise en avant de la présence d’attributs obsolètes. Vérifier qu'il n'y a pas de balise ou d’attribut obsolète dans le contenu (Fréquent lors de refonte ou de copier/coller) 
*/
function check_part_10(){
	if(debug_flag) console.log("10 Old tag");

	/* A. Old tag
	<acronym>	Defines an acronym
	<applet>	Defines an applet
	<basefont>	Defines an base font for the page.
	<big>	Defines big text
	<center>	Defines centered text
	<dir>	Defines a directory list
	<font>	Defines text font, size, and color
	<frame>	Defines a frame
	<frameset>	Defines a set of frames
	<isindex>	Defines a single-line input field
	<noframes>	Defines a noframe section
	<s>	Defines strikethrough text
	<strike>	Defines strikethrough text
	<tt>	Defines teletype text
	<u> 	Defines underlined text
	
	Add du RAWeb 10.1.1 
	<blink>
	<marquee>
	<s>
	*/

	// A. Old tag NC
	const nia10a_nodes = document.querySelectorAll('acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee,s'); // NC
	if(nia10a_nodes && nia10a_nodes.length > 0 && isItemsVisible(nia10a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10a' class='result-focus label-red'>10-A</a> : Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]</li>");
	  setItemsOutline(nia10a_nodes,"red","nia10a","10-A");
	}
	
	// B. Old tag Nice-to-have
	// Exception pour les horaires : https://jira.intranet.etat.lu/browse/GUILUV3-1002
	const nia10b_nodes = document.querySelectorAll('i, *:not(.cmp-hours__list) > * > * > b'); // NtH
	if(nia10b_nodes && nia10b_nodes.length > 0 && isItemsVisible(nia10b_nodes)){
	  setItemToResultList("man","<li><a href='#' data-destination='nia10b' class='result-focus label-yellow'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>");
	  setItemsOutline(nia10b_nodes,"yellow","nia10b","10-B");
	}

	/* B. Old attribut
	rev	link, a
	charset	link and a
	shape	a
	coords	a
	longdesc	img and iframe.
	target	link
	nohref	area
	profile	head
	version	html
	name	img
	scheme	meta
	archive	object
	classid	object
	codebase	object
	codetype	object
	declare	object
	standby	object
	valuetype	param
	type	param
	axis	td and t
	abbr	td and t
	scope	td
	align	caption, iframe, img, input, object, legend, table, hr, div, h1, h2, h3, h4, h5, h6, p, col, colgroup, tbody, td, tfoot, th, thead and tr.
	alink	body
	link	body
	vlink	body
	text	body
	background	body
	bgcolor	table, tr, td, th and body.
	border	table and object.
	cellpadding	table
	cellspacing	table
	char	col, colgroup, tbody, td, tfoot, th, thead and tr.
	charoff	col, colgroup, tbody, td, tfoot, th, thead and tr.
	clear	br
	compact	dl, menu, ol and ul.
	frame	table
	frameborder	iframe
	hspace	img and object.
	vspace	img and object.
	marginheight	iframe
	marginwidth	iframe
	noshade	hr
	nowrap	td and th
	rules	table
	scrolling	iframe
	size	hr
	type	li, ol and ul.
	valign	col, colgroup, tbody, td, tfoot, th, thead and tr
	width	hr, table, td, th, col, colgroup and pre.
	*/

	// C. Old attribut
	const nia10c_nodes = document.querySelectorAll('link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]'); // NC
	if(nia10c_nodes && nia10c_nodes.length > 0 && isItemsVisible(nia10c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10c' class='result-focus label-red'>10-C</a> : Présence d'attributs HTML obsoletes</li>");
	  setItemsOutline(nia10c_nodes,"red","nia10c","10-C");
	}
	
	// D. Presentation attribut
	const nia10d_nodes = document.querySelectorAll('[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)'); 
	if(nia10d_nodes && nia10d_nodes.length > 0 && isItemsVisible(nia10d_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10d' class='result-focus label-red'>10-D</a> : Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]</li>");
	  setItemsOutline(nia10d_nodes,"red","nia10d","10-D");
	}
}