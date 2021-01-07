import axios from 'axios';

// Retrieve cookies and header data selectively depening on request source (server vs client)
export default ({ req }) => {
  return typeof window === 'undefined'
    ? axios.create({
        baseURL:
          'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: req.headers,
      })
    : axios.create({
        baseUrl: '/',
      });
};

// export default buildClient;
