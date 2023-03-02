import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-manage-photos',
  templateUrl: './manage-photos.component.html',
  styleUrls: ['./manage-photos.component.css']
})
export class ManagePhotosComponent implements OnInit {

  data=[
    {
      id:1,
      titulo:"Fotos Aprobadas",
      descripcion:"Ver todas las fotos que han sido aprobadas para la anunciante",
      link:"aprovedimages",
      tipo:1,
      button:"Ver Fotos"
    },
    {
      id:2,
      titulo:"Subir Fotos",
      descripcion:"Subir fotos  para la anunciante",
      link:"images",
      tipo:1,
      button:"Ver Fotos"
    },
    {
      id:3,
      titulo:"Aprobar Fotos",
      descripcion:"Apruebe fotos y descargue para retoques de la anunciante",
      link:"downimages",
      tipo:1,
      button:"Ver Fotos"
    },
    {
      id:4,
      titulo:"Fotos del Anuncio",
      descripcion:"Ver todas las fotos que estan en el listado de la anunciante",
      link:"anuncio-general",
      tipo:1,
      button:"Ver Fotos"
    },
    {
      id:5,
      titulo:"Foto de perfil",
      descripcion:"Modificar la foto del perfil de la anunciante",
      link:"aprovedimages",
      tipo:2,
      button:"Ver Fotos"
    },
    {
      id:6,
      titulo:"Foto Eliminadas",
      descripcion:"Ver las imagenes eliminadas por la anunciante",
      link:"imagesdeleted",
      tipo:1,
      button:"Ver Fotos"
    },
  ];

  modal_loading:boolean=false;
  modal_imagelistado:boolean=false;
  modal_anuncio:boolean=false;
  modal_images:boolean=false;
  id:string="";
  city: any="";

  constructor(private router:Router,private route:ActivatedRoute,private eventos:EventosService) {
    eventos.closingDialog().subscribe(x=>{
      this.modal_imagelistado=false;
    });
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.city = params['city'];
    });   
  }

  show(item){

    switch (item.tipo) {
      case 1:
        this.router.navigate([`home/${this.city}/${item.link}/${this.id}`]);
        break;

      case 2:
        this.modal_imagelistado=true;
      break;
    
      default:
        break;
    }

  }

}
