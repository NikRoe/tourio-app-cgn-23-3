import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }

      response.status(200).json(place);
    } catch (error) {
      console.error(error);
      response.status(500).json({ status: "Internal Server Error" });
    }
  }

  if (request.method === "PATCH") {
    try {
      await Place.findByIdAndUpdate(id, {
        $set: request.body,
      });

      response.status(200).json({ status: `Place ${id} updated!` });
    } catch (error) {
      console.error(error);
      response.status(500).json({ status: "Internal Server Error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Place.findByIdAndDelete(id);

      response
        .status(200)
        .json({ status: `Place ${id} successfully deleted.` });
    } catch (error) {
      console.error(error);
      response.status(500).json({ status: "Internal Server Error" });
    }
  }
}
