import { Component, OnInit } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';

import { TrackService } from './track.service';
import { Track } from '../model/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Name' },
    { property: 'color', label: 'Color' },
    {
      property: 'status', label: 'Status', type: 'label', labels: [
        { value: 'active', color: 'success', label: 'Active' },
        { value: 'inactive', color: 'danger', label: 'Inactive' }
      ]
    }
  ];
  tracks: Array<Track>;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.trackService.get().subscribe(tracks => {
      this.tracks = tracks.items.map(track => Object.assign(track, { status: (track.deleted ? 'inactive' : 'active') }));
    });
  }

}
