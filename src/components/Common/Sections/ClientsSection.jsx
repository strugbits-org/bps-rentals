import SliderClients from "../SliderClients";

const ClientsSection = ({ data }) => {

  return (
    <section className={`section-clients ${data.length === 0 ? "hidden" : ""}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <SliderClients data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;