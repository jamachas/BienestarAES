$(document).ready(function() {
  var prop;
	
	var facts = {
		hand: {
			icon: "hospital.png",
			fact: "<h1>Incapacidades</h1>"
		},
		arrows: {
		icon: "salary.png",
			fact: "<h1>Libranzas</h1>"
		},
		    chalis: {
			icon: "helping.png",
			fact: "<h1>Ayuda del público</h1>"
		},
		flowchart: {
		icon: "poliza-de-seguros.png",
			fact: "<h1>Póliza de vida</h1>"
		},
		    wifitablet: {
			icon: "sin-contacto.png",
			fact: "<h1>Elige un compañero</h1>"
		},
    cash: {
		icon: "video-conference.png",
			fact: "<h1>Trabajo remoto e híbrido</h1>"
		},
    piggybank_1_: {
			icon: "bank.png",
			fact: "<h1>Préstamos</h1>"
		},
    padlockscreen: {
			icon: "convenio_ru.png",
			fact: "<h1>Convenios</h1>"
		},
    atoz: {
			icon: "jobpoints_r.png",
			fact: "<h1>JobPoints</h1>"
		},
    _x33_people: {
			icon: "study_r.png",
			fact: "<h1>Formación</h1>"
		},
		    tvgraph: {
			icon: "phone-call_r.png",
			fact: "<h1>Llamada a un amigo</h1>"
		},
		    clock: {
			icon: "giftbox.png",
			fact: "<h1>Pregunta del director</h1><p>¡Tú momento ha llegado!</p>"
		},
    _x30_1screen: {
			icon: "money-bag_r.png",
			fact: "<h1>Ingresos extras</h1>"
		},
    demo: {
			icon: "birthday-cake.png",
			fact: "<h1>Cumpleaños</h1>"
		},
    globe: {
			icon: "graduacion_r.png",
			fact: "<h1>Graduación</h1>"
		},

    onoff: {
			icon: "sin-contacto.png",
			fact: "<h1>Elige un compañero</h1>"
		},



	};
	
	var init = function() {
		prop = $(".roulette .wheel").propeller({
			inertia: .97,
			onStop: function() {
			},
			onRotate: function() {
				updateIconHighlight();
				setFact();
			}
		});
		
		updateIconHighlight();
		setFact();
	}
	
	var findIconsInWheel = function() {
		var svgDoc = $(".wheel svg").get(0);
		
		var $icons = $();
		
		$(svgDoc.getElementsByTagName("path")).each(function(){
			var $path = $(this);
			
			if (!$path.attr("fill") == "#FFFFFF" && !$path.attr("opacity") == "0.5") {
				return;
			}
			
			var id = $path.attr("id");
			var $icon;
			if (id) 
			{
				$icon = $path;
			} 
			else 
			{
				id = $path.parent().attr("id");
				
				if (id) {
					$icon = $path.parent();
				}
			}
			
			if (id && $icon && $icon.length > 0) 
			{
				if (id.indexOf("SVGID") > -1) {
					return;
				}
				
				$icons = $icons.add($icon);
			}
			
		});
		
		return $icons;
	}
	
	var findSegments = function() {
		var svgDoc = $(".wheel svg").get(0);
		var $groups = $(svgDoc.getElementsByTagName("g"));
		
		var $segmentGroup = $groups.first(function() {
			var $g = $(this);
			var cp = $g.attr("clip-path");
			if ($g.is("[clip-path]") && cp && cp.indexOf("SVGID_2") >= 0) {
				return true;
			}
			
			return false;
		});
		
		return $segmentGroup.find("path[fill]");
	}
	
	var updateIconHighlight = function() 
	{
		var $icons = findIconsInWheel();
		var $pointer = $(".roulette .pointer .tip");
		
		$icons
			.attr("opacity", "0.5");
		$icons
			.filter("g").children().attr("opacity", "0.5");
		
		var $closest = $pointer.nearest($icons).first();
		
		$closest
			.attr("opacity", "1");
		$closest
			.filter("g").children().attr("opacity", "1");
		
	}
	
	var setFact = function() 
	{
		var $icons = findIconsInWheel();
		var $pointer = $(".roulette .pointer .tip");
		
		var $closest = $pointer.nearest($icons).first();
		
		var id = $closest.attr("id");
		
		$("#factImg").hide();
		$("#factDesc").hide();
		
		if (id) 
		{
			var fact = facts[id];
			
			if (fact) 
			{
				if (fact.icon) {
					$("#factImg").attr("src", fact.icon).show();
				}
				
				if (fact.fact) {
					$("#factDesc").html(fact.fact).show();
				}
			}
		}
	}
	
	init();
});