// Import stylesheets
import './style.css';

import {
  Map,
  TileLayer,
  layerGroup,
  Control,
  Marker,
  Icon,
  geoJSON,
} from 'leaflet';

const map = new Map('map');

// 高德
const amapLayer = new TileLayer(
  'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  {
    subdomains: ['1', '2', '3', '4'],
  }
);
// 天地图
const tdtVectorLayer = new TileLayer(
  '//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    key: '174705aebfe31b79b3587279e211cb9a',
  }
);
const tdtlabelLayer = new TileLayer(
  '//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
  {
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    key: '174705aebfe31b79b3587279e211cb9a',
  }
);
const tdtLayer = new layerGroup([tdtVectorLayer, tdtlabelLayer]);
amapLayer.addTo(map);
map.setView([39.909186, 116.3974111], 10);

// 切换地图:第一种方法
const items = document.getElementsByName('base');
items.forEach((item) => {
  item.onclick = (e) => {
    switch (e.target.value) {
      case 'amap':
        tdtLayer.removeFrom(map);
        amapLayer.addTo(map);
        break;
      case 'tdt':
        amapLayer.removeFrom(map);
        tdtLayer.addTo(map);
        break;
    }
  };
});

// 切换地图第二种方法
let baseLayers = {
  高德: amapLayer,
  天地图: tdtLayer,
};
new Control.Layers(baseLayers).addTo(map);

// 添加点位 阿里图标添加url
const svg1 =
  '<svg t="1656468334890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="200" height="200"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#FF3D00" p-id="2221"></path></svg>';
const svg2 =
  '<svg t="1656468334890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2220" width="200" height="200"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#003D00" p-id="2221"></path></svg>';
const svg3 =
  '<svg t="1656470369921" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2349" width="200" height="200"><path d="M527.57504 71.91552 24.38144 417.75616 24.38144 512l94.24384 0 0 440.0896 786.75456 0L905.37984 512l94.23872 0L999.61856 417.75616 527.57504 71.91552zM752.3072 660.17792l-174.67392 0 0 174.67392L446.05952 834.85184l0-174.67392L272.52224 660.17792l0-130.432 174.67392 0L447.19616 355.07712l130.43712 0 0 174.67392 174.67392 0L752.3072 660.17792z" p-id="2350"></path></svg>';
const marker = new Marker([39.909186, 116.3974111], {
  icon: new Icon({
    iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg1),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    shadowUrl: 'data:image/svg+xml,' + encodeURIComponent(svg1), // 图标阴影url
    shadowSize: [20, 20],
  }),
}).addTo(map);

// geojson
const data1 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '西环',
        type: '医院',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.29062652587892, 39.945542175353026],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '东环',
        type: '学校',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.45576477050783, 39.92895792815383],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: '北二环',
        type: '医院',
      },
      geometry: {
        type: 'Point',
        coordinates: [116.35414123535156, 39.86785113379603],
      },
    },
  ],
};
const geo = new geoJSON(data1, {
  pointToLayer: function (geoJSONPoint, latlng) {
    const type = geoJSONPoint.properties['type'];
    if (type === '医院') {
      return new Marker(latlng, {
        icon: new Icon({
          iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg3),
          iconSize: [40, 40],
        }),
      }).bindTooltip(geoJSONPoint.properties['name'], {
        permanent: true,
        direction: 'left',
      });
    } else {
      return new Marker(latlng, {
        icon: new Icon({
          iconUrl: 'data:image/svg+xml,' + encodeURIComponent(svg2),
          iconSize: [40, 40],
        }),
      }).bindTooltip(geoJSONPoint.properties['name'], {
        // permanent: true,
        direction: 'left',
      });
    }
  },
}).addTo(map);

// 五环复选框
const checks = document.getElementById('checks');
checks.onchange = (e) => {
  if (e.target.checked) {
    geo.addTo(map);
  } else {
    geo.removeFrom(map);
  }
};
