import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { adminApi, handleApiError } from "../../utils/api";
import { useToast } from "../../hooks/use-toast";

import {
  User,
  Briefcase,
  Lightbulb,
  GraduationCap,
  Star,
  Folder,
  GitBranch,
  BrainCircuit,
  FlaskConical,
  Mail,
} from "lucide-react";

import SearchResultBlock from "../ui/SearchResultsBlock";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const response = await adminApi.searchContent(query);
          if (response.success) {
            setResults(response.data);
          }
        } catch (error) {
          handleApiError(error, toast);
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    }
  }, [query, toast]);

  const noResults =
    !results ||
    (results.profile.length === 0 &&
      results.projects.length === 0 &&
      results.skills.length === 0 &&
      results.education.length === 0 &&
      results.experience.length === 0 &&
      results.learning_journey.length === 0 &&
      results.growth_mindset.length === 0 &&
      results.experiments.length === 0 &&
      results.contact.length === 0 &&
      results.footer.length === 0);

  return (
    <div className="min-h-screen  p-6">
      <Card className="bg-black/40 backdrop-blur-lg border border-gray-700/60 rounded-3xl ring-1 ring-gray-800/30 duration-300  border-slate-700 text-white shadow-lg hover:shadow-cyan-500/50 transition-all">
        <CardHeader className=" pb-4">
          <CardTitle className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient">
            Search Results for: <span className="text-white/90">"{query}"</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 mt-4">
          {noResults ? (
            <p className="text-slate-400 text-lg text-center py-10">
              No content found matching your search.
            </p>
          ) : (
            <>
              <SearchResultBlock
                title="Profile"
                icon={User}
                results={results.profile}
                linkTo="/admin/profile"
                color="profile"
              />
              <SearchResultBlock
                title="Matches in Skills"
                icon={Lightbulb}
                color="skills"
                linkTo="/admin/skills"
                results={results.skills.map((skill) => ({
                  field: skill.name.replace("-", " "),
                  value:
                    skill.type === "category"
                      ? "Match in Category Name"
                      : `Skill Match (${skill.proficiency}%) in ${skill.category.replace("-", " ")}`,
                }))}
              />
              <SearchResultBlock
                title="Education"
                icon={GraduationCap}
                results={results.education}
                linkTo="/admin/education"
                color="education"
              />
              <SearchResultBlock
                title="Matches in Projects"
                icon={Briefcase}
                color="projects"
                linkTo="/admin/projects"
                results={results.projects.map((project) => ({
                  field: project.title,
                  value: project.matches.join(", "),
                }))}
              />
              <SearchResultBlock
                title="Experience"
                icon={Star}
                results={results.experience}
                linkTo="/admin/experience"
                color="xp"
              />
              <SearchResultBlock
                title="Learning Journey"
                icon={GitBranch}
                results={results.learning_journey}
                linkTo="/admin/learning-journey"
                color="lg"
              />
              <SearchResultBlock
                title="Growth Mindset"
                icon={BrainCircuit}
                results={results.growth_mindset}
                linkTo="/admin/learning-journey"
                color="gm"
              />
              <SearchResultBlock
                title="Experiments"
                icon={FlaskConical}
                results={results.experiments}
                linkTo="/admin/experiments"
                color="exp"
              />
              <SearchResultBlock
                title="Contact Section"
                icon={Mail}
                color="contact"
                linkTo="/admin/contact"
                results={results.contact}
              />
              <SearchResultBlock
                title="Footer"
                icon={Folder}
                color="footer"
                linkTo="/admin/footer"
                results={results.footer}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResults;
