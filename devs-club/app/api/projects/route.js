// pages/api/projects/index.js
import dbConnect from '../conn';
import Project from '../../models/project.model';

export async function GET(req) {
    console.log("Fetching projects...");
    try {
      await dbConnect(); // Ensure database connection
  
      const projects = await Project.find({}); // Fetch projects from MongoDB
      // console.log("Fetched projects:", projects);
      return new Response(JSON.stringify({ success: true, data: projects }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
  
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch projects" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  export async function POST(req) {
    try {
      await dbConnect(); 
      const data = await req.json();
      const { name, description, teamLead, fullDescription, teamMembers, status,key } = data;
      
      if(!(key == process.env.NEXT_PUBLIC_KEY)){
        return new Response(
          JSON.stringify({ success: false, error: "Invalid API Key" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      // Validate status
      const validStatus = ["active", "completed", "on-hold"];
      const projectStatus = validStatus.includes(status) ? status : "completed";
      console.log("status: " + status);

      // Create new project with validated status
      const newProject = new Project({
        name,
        description,
        status ,
        teamLead, 
        fullDescription,
        teamMembers,
      });

      await newProject.save();
      console.log("Saved project with status:", newProject); // Debug log

      return new Response(
        JSON.stringify({ success: true, data: newProject }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error adding project:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error.message || "Failed to add project" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  export async function DELETE(req) {
    console.log("Deleting project...");
    try {
      const { id,key } = await req.json();
      console.log(id,key)  // Extract project id from request body

      if(!(key == process.env.NEXT_PUBLIC_KEY)){
        console.log("Key is ", key)
        return new Response(
          JSON.stringify({ success: false, error: "Invalid API Key" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      await dbConnect(); 
      console.log("Id is " + id);
      // Find and delete the project by its custom 'id' field
      const deletedProject = await Project.findOneAndDelete({ id: id });  // use id field, not _id
      
      if (!deletedProject) {
        return new Response(
          JSON.stringify({ success: false, error: "Project not found" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new Response(
        JSON.stringify({ success: true, data: deletedProject }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to delete project" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  